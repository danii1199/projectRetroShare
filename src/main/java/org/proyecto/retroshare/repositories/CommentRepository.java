package org.proyecto.retroshare.repositories;

import org.proyecto.retroshare.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long>{

}
