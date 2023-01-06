create or replace function admin.fn_discussion_created() 
	returns trigger as $discussion_created$
	begin
		perform pg_notify(
    		'discussion_created',
			json_build_object(
			    'operation', TG_OP,
			    'record', row_to_json(NEW)
    		)::text);
  		return NEW;
	end;
	$discussion_created$ language plpgsql;

drop trigger if exists discussion_created
  on admin.discussions;
 
create trigger discussion_created
  after insert 
  on admin.discussions
  for each row execute function admin.fn_discussion_created();

create or replace function admin.fn_post_changed() 
	returns trigger as $post_changed$
  declare
    row RECORD;
	begin
    IF (TG_OP = 'DELETE') THEN
      row = OLD;
    ELSE 
      row = NEW;
    END IF;
		
    perform pg_notify(
    		'post_changed',
			json_build_object(
			    'operation', TG_OP,
			    'record', row_to_json(row)
    		)::text);
  		return row;
	end;
	$post_changed$ language plpgsql;

drop trigger if exists post_changed
  on admin.posts;
 
create trigger post_changed
  after insert or update or delete
  on admin.posts
  for each row execute function admin.fn_post_changed();

create or replace function admin.fn_reaction_changed() 
	returns trigger as $reaction_changed$
	declare
    row RECORD;
	begin
    IF (TG_OP = 'DELETE') THEN
      row = OLD;
    ELSE 
      row = NEW;
    END IF;

		perform pg_notify(
    		'reaction_changed',
			json_build_object(
			    'operation', TG_OP,
			    'record', row_to_json(row)
    		)::text);
  		return row;
	end;
	$reaction_changed$ language plpgsql;

drop trigger if exists reaction_changed
  on admin.reactions;
 
create trigger reaction_changed
  after insert or update or delete
  on admin.reactions
  for each row execute function admin.fn_reaction_changed();

create or replace function admin.fn_relationship_post_file_deleted() 
	returns trigger as $relationship_post_file_deleted$
	declare
    row RECORD;
	begin
    IF (TG_OP = 'DELETE') THEN
      row = OLD;
    ELSE 
      row = NEW;
    END IF;

		perform pg_notify(
    		'relationship_post_file_deleted',
			json_build_object(
			    'operation', TG_OP,
			    'record', row_to_json(row)
    		)::text);
  		return row;
	end;
	$relationship_post_file_deleted$ language plpgsql;

drop trigger if exists relationship_post_file_deleted
  on admin.relationship_post_file;
 
create trigger relationship_post_file_deleted
  after delete
  on admin.relationship_post_file
  for each row execute function admin.fn_relationship_post_file_deleted();
